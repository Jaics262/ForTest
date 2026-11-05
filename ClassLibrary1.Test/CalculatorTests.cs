using ClassLibrary1;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ClassLibrary1.Test.csProj;

[TestClass]
public sealed class CalculatorTests
{
    [TestMethod]
    public void Add_ReturnsSum()
    {
        Assert.AreEqual(7, Calculator.Add(3, 4));
    }

    [TestMethod]
    public void Subtract_ReturnsDifference()
    {
        Assert.AreEqual(-1, Calculator.Subtract(3, 4));
    }

    [TestMethod]
    public void Multiply_ReturnsProduct()
    {
        Assert.AreEqual(12, Calculator.Multiply(3, 4));
    }

    [TestMethod]
    public void Divide_ReturnsQuotient()
    {
        Assert.AreEqual(2.5, Calculator.Divide(5, 2));
    }

    [TestMethod]
    public void Divide_ByZero_Throws()
    {
        Assert.ThrowsExactly<DivideByZeroException>(() => Calculator.Divide(5, 0));
    }
}
